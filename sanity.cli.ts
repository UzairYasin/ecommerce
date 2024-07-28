/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { useCdn } from './sanity/env'
import { createClient } from '@sanity/client';
import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { Image } from 'sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
useCdn:true

export default defineCliConfig({ api: { projectId, dataset } })
