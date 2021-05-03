import mongoose, { Schema, Document } from "mongoose";
import { PasswordHashingManager } from "../services/password";

// interface that describes the properties that
// are required to create a new user
interface IUserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}

// interface that describes the property that the the model has
interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

// interface that describes the properties that a document has
export interface IUserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", function (done) {
  if (this.isModified("password")) {
    const hashedPassword = PasswordHashingManager.toHash(this.get("password"));

    this.set("password", hashedPassword);
  }

  done();
});
userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { User };
