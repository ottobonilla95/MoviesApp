import mongoose, { Schema, Document } from "mongoose";

// interface that describes the properties that
// are required to create a new movie
interface IMovieAttrs {
  name: string;
  description: number;
  image: string;
  userId: string;
}

// interface that describes the properties that a document has
export interface IMovieDoc extends mongoose.Document {
  name: string;
  description: number;
  image: string;
  userId: string;
}

// interface that describes the property that the the model has
interface IMovieModel extends mongoose.Model<IMovieDoc> {
  build(attrs: IMovieAttrs): IMovieDoc;
}

const movieSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

movieSchema.statics.build = (attrs: IMovieAttrs) => {
  return new Movie(attrs);
};

const Movie = mongoose.model<IMovieDoc, IMovieModel>("Movie", movieSchema);

export { Movie };
