// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	try {
		const { email, password, confirmPassword } = req.body;

		if (!email || !password || !confirmPassword) {
			throw new Error('All fields must be filled!');
		}

		res.status(200).json({ name: 'John Doe' });
	} catch (err) {
		res.status(400).json({
			data: {
				status: 'failed',
				message: err,
			},
		});
	}
}
