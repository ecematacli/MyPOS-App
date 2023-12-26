const ENV_CONFIG_ENUM = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
}

const configEnvironment =
  process.env.ENV_CONFIG_ENUM || ENV_CONFIG_ENUM.PRODUCTION

const config = {
  [ENV_CONFIG_ENUM.DEVELOPMENT]: {
    ENV_API_URL: 'https://localhost:8081',
  },
  [ENV_CONFIG_ENUM.PRODUCTION]: {
    ENV_API_URL: '',
  },
}

const getWebpackDefineConfig = (env = configEnvironment) => {
  const conf = getConfig(env)
  return Object.keys(conf).reduce((acc, key) => {
    // @ts-ignore
    return { ...acc, [key]: JSON.stringify(conf[key]) }
  }, {})
}

const getJestConfig = (env = configEnvironment) => {
  return getConfig(env)
}

const getConfig = (env = configEnvironment) => {
  if (config[env]) {
    return config[env]
  }
  return config[ENV_CONFIG_ENUM.PRODUCTION]
}

export { getConfig, getWebpackDefineConfig, getJestConfig, ENV_CONFIG_ENUM }
