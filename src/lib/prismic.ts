import prismic from 'prismic-javascript';

export const apiEndPoint = process.env.PRISMIC_ENDPOINT_URL;

export const client = (req = null) => {
    const options = req ? { req } : null;

    return prismic.client(apiEndPoint, options);
}