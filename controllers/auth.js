import User from "../models/User.js"; //импортируем схему юзера
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body; //req-то что приходит со стороны клиента res-отправляем на фронт
    const isUsed = await User.findOne({ username }); //ищем юзера
    if (isUsed) {
      return res.status(402).json({
        message: "данный username уже занят",
      }); //если есть уже такой пользователь то возвращаем ошибку 402
    }

    const salt = bcrypt.genSaltSync(10); //шифрование
    const hash = bcrypt.hashSync(password, salt); //шифрование

    //newUser является экземпляром юзера
    const newUser = new User({
      username,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save(); //записали пользователя в бд

    res.json({
      newUser,
      message: "Успешная регистрация",
    }); //отдаем пользователя+сообщение
  } catch (error) {
    res.json({ message: "ошибка при создании пользователя" });
    console.log(error);
  }
};
//login user
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(402).json({
      message: "такого пользователя не существует",
    }); //проверка на пользователя
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password); //сравниваем хешир пароль и пароль который лежит в user
  if (!isPasswordCorrect) {
    return res.json({
      message: "Неверный пароль.",
    });
  }
  //токен нужен для определения вошли ли мы в систему
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({
    token,
    user,
    message: "Вы вошли",
  });

  try {
  } catch (error) {
    res.json({ message: "ошибка при авторизации пользователя" });
    console.log(error);
  }
};
//get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(402).json({
        message: "такого пользователя не существует",
      }); //проверка на пользователя
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({message:"нет доступа"})
    console.log(error);
  }
};
