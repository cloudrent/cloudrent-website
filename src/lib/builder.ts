import { fetchOneEntry, type GetContentOptions } from '@builder.io/sdk-react'

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || ''

export async function getBuilderContent(
  model: string,
  urlPath: string,
  options?: Partial<GetContentOptions>
) {
  if (!apiKey) {
    return null
  }

  return fetchOneEntry({
    model,
    apiKey,
    userAttributes: { urlPath },
    ...options,
  })
}

export { apiKey as builderApiKey }
