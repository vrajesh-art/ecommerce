//yaha hum dhpo function banayenge ek hash karnekeliye and ek compare krke decrypt karnekeliye

//we are using bcryptjs for hashing
import bcrypt from 'bcrypt'
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
};

export const comparePassword = async (password, hashedPassword) => {
    console.log(password)
    console.log(hashedPassword)
    return bcrypt.compare(password, hashedPassword);

}