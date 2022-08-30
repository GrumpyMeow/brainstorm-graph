# Install script for NX v14.5.10

This is the script used to create this specific branch. Each NX version will be created as a seperate branch.
Update this script for each new NX version and put it as readme.md in the root of the NX-workspace.
This script is manually run and validated.

## Install correct Node-version which should match with the used Cypress and Cypress-container

## Check Node-version used in Cypress container (Cypress v10.6.0  > Node v16.14.2) <https://github.com/cypress-io/cypress-docker-images/tree/master/included>

```sh
nvm install v16.14.2
nvm use v16.14.2
```

## Start clean

```sh
npm cache clear --force
cd ~
sudo rm -r athora-nx-scripted
```

## Get latest version of nx-workspace (optionally update nxversion-variable)

```sh
npm view create-nx-workspace
```

## Provide the version numbers by looking at: <https://github.com/nrwl/nx/>

```sh
nxversion='14.5.10'
appname='myzwitserleven-app'
```

## Create workspace

```sh
npm i -g create-nx-workspace@$nxversion
npx create-nx-workspace AthoraNxScripted --name=athora-nx-scripted --nx-cloud=false --packageManager=npm --interactive=false --style=scss --cli=angular --appName=$appname --preset=angular 
cd athora-nx-scripted
```

## Check which exact angular version is being used

```sh
npm ls @angular/core
ngversion='14.1.3'
```

## Add git remote

```sh
git remote add origin https://nubulo@dev.azure.com/nubulo/AppPortals/_git/AthoraNxScripted
git branch $nxversion
git checkout $nxversion
```

## Install packages

```sh
echo save-exact=true >> .npmrc
node -v > .nvmrc
```

## Install CLI packages globally

```sh
npm install -g nx@$nxversion
```

## Install @Angular/cli package global same version

```sh
npm ls @angular/cli
npm install -g @angular/cli@14.1.3
```

## Continue

```sh
nx analytics off
ng generate @nrwl/angular:ngrx --name=$appname --module=apps/myzwitserleven-app/src/app/app.module.ts --facade=true --root=true --barrels=true --useDataPersistence=true --syntax=creators
ng generate @nrwl/angular:storybook-configuration --name=$appname --no-configureCypress --no-generateCypressSpecs --generateStories=true
npm view stylelint
npm install -D stylelint@14.11.0
npm view nx-stylelint
npm i -D nx-stylelint@13.5.3
nx g nx-stylelint:configuration --project $appname --formatter=string
```

## Create a library

```sh
npx nx generate @nrwl/angular:library --name=shared-components --addModuleSpec --setParserOptionsProject --no-interactive 
npx nx generate @nrwl/angular:storybook-configuration --name=shared-components --no-configureCypress --no-generateCypressSpecs --no-interactive
npx nx generate @nrwl/angular:ngrx --name=shared-components --module=libs/shared-components/src/lib/shared-components.module.ts --barrels --facade --no-interactive
```

## Create tools

```sh
npx nx generate @nrwl/linter:workspace-rule --name=validate-something --no-interactive
```

## Install for ng-apimock

```sh
npm install @nrwl/web@$nxversion
npm view @ng-apimock/core
npm view @ng-apimock/cypress-plugin
npm view @ng-apimock/dev-interface
npm install -D @ng-apimock/core@3.5.0 @ng-apimock/cypress-plugin@2.2.0 @ng-apimock/dev-interface@3.1.1
```

## Install audit-ci

```sh
npm view audit-ci
npm install -D audit-ci@6.3.0
```

## Push branch

```sh
git add *
git commit -m "Scripted $nxversion"
git push --set-upstream origin $nxversion
```
