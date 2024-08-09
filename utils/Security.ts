const bcrypt = require('bcrypt');

export async function hash(text: string): Promise<string> {

    const saltOrRounds = 10;
    return await bcrypt.hash(text, saltOrRounds);
}