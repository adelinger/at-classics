const blurImageAddress = "https://" + process.env.VERCEL_URL;
const dev = process.env.NODE_ENV !== 'production';

export const blurImageUrl =dev ? '/images/blur.png' : blurImageAddress+ '/images/blur.png';