import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

//an interface that describes the properties that a User model has
interface UserModel extends Model<UserDocument> {
  build(user: IUser): UserDocument;
}

//an interface that describes the properties that a User document has
interface UserDocument extends Document {
  email: string;
  password: string;
  comparePassword(password: string, candidatePassword: string): Promise<any>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async (
  password: string,
  candidatePassword: string
) => {
  return bcrypt.compare(password, candidatePassword);
};

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
