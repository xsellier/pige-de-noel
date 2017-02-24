# Pige de noël [![Build Status](https://travis-ci.com/xsellier/pige-de-noel.svg?token=brwsx1qJJQbFtxcxsvCp&branch=master)](https://travis-ci.com/xsellier/pige-de-noel)

## Prerequisite

[NodeJs](https://nodejs.org/en/download/) has to be installed on your computer

## Usage

Extract the attached archive named `pige-de-noel.zip`, then open a terminal.

```shell
npm install --production
node .
```

Then, load [http://127.0.0.1:8000](http://127.0.0.1:8000) in a browser to see the output

### Maximum number of user is set to 50 by default

To allow more than 50 users, edit the file `config/default.json` and replace the value of `maxMembers`

## Internal Testing

Extract the attached archive named `pige-de-noel.zip`, then open a terminal.

### Linting

```shell
npm install
npm run lint
```

### Unit tests

```shell
npm install
npm run test-unit
```

### Integration tests

```shell
npm install
npm run test-integration
```

### end-to-end tests (including UI)

Those tests are performed manually.
