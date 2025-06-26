import mongoose from "mongoose";

const url = "mongodb+srv://renan:123@202501.ulvez8l.mongodb.net/202501?retryWrites=true&w=majority&appName=202501";

const conexao = await mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default conexao;
