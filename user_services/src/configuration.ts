import {
  readFileSync,
  existsSync
} from 'fs'
import {
  join
} from 'path'
import * as yaml from 'js-yaml'

const yamlConfigFiles = [
  'development.yml',
  'staging.yml',
  'production.yml',
  'defaults.yml'
]

export interface Configuration {
  service: ServiceConfiguration,
  database: DatabaseConfiguration
}

export interface DatabaseConfiguration {
  host: string
  port: number
  user: string
  pwd: string
  db: string
}

export interface ServiceConfiguration {
  port: number
}

export const configuration = (): Configuration => {
  for (let i = 0; i < yamlConfigFiles.length; i++) {
    const file = yamlConfigFiles[i]
    const path = join(process.cwd(), file)
    if (existsSync(path)) {
      return yaml.load(readFileSync(path, 'utf-8')) as Configuration
    }
  }
  throw new Error('cannot load configuration file')
}