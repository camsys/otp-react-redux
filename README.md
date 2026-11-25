# CamSys / MnDOT trip planner UI (otp-react-redux fork)

This is CamSys's fork of [otp-react-redux](https://github.com/opentripplanner/otp-react-redux), used as the
**MnDOT trip planner UI**. MnDOT's branding and config don't live here. They're in
[`mndot-otp-v2-docker/frontend/`](https://github.com/camsys/mndot-otp-v2-docker/tree/main/frontend), and
Jenkins copies them in at build time. Everything from **"Upstream README"** down is the original upstream text.

System context: [`mndot-otp-v2-docker/ARCHITECTURE.md`](https://github.com/camsys/mndot-otp-v2-docker/blob/main/ARCHITECTURE.md) ·
this repo: [ARCHITECTURE.md](ARCHITECTURE.md)

## Branch strategy

**One development branch plus git tags.** There's no npm release. A "release" is a git tag that Jenkins
builds at deploy time.

| Role | Where | Notes |
|---|---|---|
| Development | branch **`camsys/v1/dev`** | All work and PRs target `camsys/v1/dev`. The dev environment builds its HEAD. |
| Release | tag `vX.Y.Z` | Pinned by `GIT_FRONTEND_TAG` in the `mndot-otp-v2-docker` Jenkinsfile on `qa` / `prod` |
| `camsys/v1/qa`, `camsys/v1/prod` | checked out first by the QA/prod jobs, then **replaced** by `git checkout tags/$GIT_FRONTEND_TAG` | So these branch heads aren't necessarily what runs. The tag is. |
| Not used | `dev` (the GitHub default: stale upstream), `camsys/dev`, `camsys/qa`, `camsys/prod`, `camsys/v2/dev`, feature branches | Don't base MnDOT work on them. |

**Look up what each environment builds, and compare it with `camsys/v1/dev`:**

```sh
# from a checkout of mndot-otp-v2-docker
for b in main qa prod; do echo "$b: $(git show origin/$b:Jenkinsfile | grep -oE 'GIT_FRONTEND_(BRANCH|TAG) *= *"[^"]+"' | tr '\n' ' ')"; done
# in this repo: changes on camsys/v1/dev that aren't in the released tag yet
git fetch --tags && git log --oneline <tag>..origin/camsys/v1/dev
```

## First-time setup (macOS)

| Tool | Version | How |
|---|---|---|
| Node | **18.12.1** (what Jenkins uses) | `brew install fnm && fnm install 18.12.1`. Matches Jenkins; newer Node versions are untested with this craco/webpack 4 toolchain. |
| yarn | 1.x | `brew install yarn` |
| Sibling checkout | `mndot-otp-v2-docker` next to this repo | Source of `config.yml`, `config.js`, `style.css` |

```sh
fnm use 18.12.1
yarn install --frozen-lockfile        # ~1 min
```

## Run locally against a local OTP

Prerequisite: OpenTripPlanner running on `localhost:8080` (see its README).

1. **Copy the MnDOT config into the git-ignored `mndot-local/` folder.** This is the same set of files
   Jenkins copies; keeping them separate leaves tracked files untouched:
   ```sh
   mkdir -p mndot-local
   ENV_BRANCH=main                              # main | qa | prod: which environment's look and keys to mirror
   for f in config.yml style.css config.js; do git -C ../mndot-otp-v2-docker show origin/$ENV_BRANCH:frontend/$f > mndot-local/$f; done
   # point the API at local OTP instead of otpv2-mndot-dev:
   sed -i '' -E 's#^  host: //otpv2-mndot-[a-z]+\.camsys-apps\.com$#  host: http://localhost\n  port: 8080#' mndot-local/config.yml
   # config.js expects to live in lib/ (Jenkins copies it to lib/config.js); fix its relative import:
   sed -i '' "s#} from './index'#} from '../lib/index'#" mndot-local/config.js
   ```
2. **Start the dev server.** The paths must be absolute, and the files must sit inside this repo, or webpack
   fails with `Cannot read properties of undefined (reading 'indexOf')`:
   ```sh
   L=$PWD/mndot-local
   YAML_CONFIG=$L/config.yml CUSTOM_CSS=$L/style.css JS_CONFIG=$L/config.js PORT=9966 yarn start
   ```
3. Open <http://localhost:9966>. You should see the **MnDOT "BETA"** header. Plan Downtown Minneapolis →
   Downtown St Paul to get 3 options.

**Expected locally:**
- **Map tiles show "Invalid key" on `localhost`.** The MapTiler keys in the docker repo are valid but
  **domain-restricted**: `*.camsys-apps.com` and `*.mntransitplanner.com` are allowed, `localhost` isn't. Routing still works. To get tiles locally, see "Map tiles locally" below.
- In the dev console: `MISSING_TRANSLATION config.menuItems.help` and an `isOpen` prop-type warning.
  These are harmless dev-mode warnings.

## Map tiles locally (optional, stopgap)

The MapTiler keys are only served to allowed domains (`*.camsys-apps.com`, `*.mntransitplanner.com`), so
`localhost` gets "Invalid key" tiles. Browsing the dev server through an allowed
hostname that points at your machine makes the tiles load with the dev (`main`) key.

```sh
# one-time, in a normal Terminal (sudo prompts for your password):
echo '127.0.0.1 local.mndot.camsys-apps.com' | sudo tee -a /etc/hosts && sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# start the dev server as usual (no extra flags needed: with no dev proxy configured, CRA skips the host check)
open http://local.mndot.camsys-apps.com:9966
# undo:
sudo sed -i '' '/local\.mndot\.camsys-apps\.com/d' /etc/hosts && sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

This borrows a deployed-environment key from a developer machine. The intended fix is a **separate
local/dev MapTiler key** that allows `localhost` and `127.0.0.1`, as MapTiler's
[key-protection guide](https://docs.maptiler.com/guides/maps-apis/maps-platform/how-to-protect-your-map-key/)
recommends, stored in Secrets Manager (MN-184). Don't add localhost to the production key.

## Build like Jenkins does

```sh
cp ../mndot-otp-v2-docker/frontend/config.yml example-config.yml
cp ../mndot-otp-v2-docker/frontend/style.css  example.css
cp ../mndot-otp-v2-docker/frontend/config.js  lib/config.js
yarn install --force && yarn build      # -> dist/, which goes into the frontend image
git checkout -- example-config.yml example.css lib/config.js   # don't commit the copies
```

## Works with (start order)

| # | Repo | Port |
|---|---|---|
| 1 | [OpenTripPlanner](https://github.com/camsys/OpenTripPlanner) `v2/dev` | 8080 |
| 2 | **otp-react-redux** (this) | 9966 |
| — | [mndot-otp-v2-docker](https://github.com/camsys/mndot-otp-v2-docker) | config source only |

---

# Upstream README

# otp-react-redux

<img src="https://github.com/opentripplanner/otp-react-redux/raw/master/otprr.png" width="500" />

A library for writing modern [OpenTripPlanner](http://www.opentripplanner.org/)-compatible multimodal journey planning applications using [React]() and [Redux]().

## Running the Example

An example of an OTP-RR application is included in the repository. The example project is a single page application with a root entry point of the `example.js` file. This example.js file can be modified to suit the needs of a particular implementation.

To run, first clone the repo and install [yarn](https://yarnpkg.com/) if needed.

Update `example-config.yml` with the needed API keys, and optionally, the OTP endpoint and initial map origin. (The default values are for a test server for Portland, OR.).

Install the dependencies and start a local instance using the following script:

```bash
yarn start
```

Should you want to maintain multiple configuration files, OTP-RR can be made to use a custom config file by using environment variables. Other environment variables also exist. `CUSTOM_CSS` can be used to point to a css file to inject, and `JS_CONFIG` can be used to point to a `config.js` file to override the one shipped with OTP-RR.

```bash
env YAML_CONFIG=/absolute/path/to/config.yml yarn start
```

## Deploying the UI

Build the js/css bundle by running `yarn build`. The build will appear in the `dist/` directory).

The same environment variables which affect the behavior of `yarn start` also affect `yarn build`. Running the following command builds OTP-RR with customized js and css:

```bash
env JS_CONFIG=my-custom-js.js CUSTOM_CSS=my-custom-css.css yarn build
```

## Library Documentation

More coming soon...

As of version 2.0, otp-react-redux utilizes React's context API in a number of components. This changed the way that some components receive props such that they will not work properly unless wrapped with the context provider used in the `ResponsiveWebapp` component.
