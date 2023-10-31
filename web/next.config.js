/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

const nextConfig = {
  async rewrites() {
		return [
			// {
			// 	source: '/api/:path*',
			// 	destination: `${API_URL}/:path*`,
			// },
			{
				source: '/socket.io',
				destination: `${API_URL}/socket.io`,
			},
		]
	},
}

module.exports = nextConfig
