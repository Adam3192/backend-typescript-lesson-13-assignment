import { Document, Schema, Model, model } from 'mongoose';

interface ICoffee extends Document {
    name: string;
    description: string;
    price: number;
}

const coffeeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Coffee: Model<ICoffee> = model('Coffee', coffeeSchema);

export { ICoffee, Coffee };