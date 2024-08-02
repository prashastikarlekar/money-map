import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, gender } = input;

				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required.");
				}
				const existingUser = await User.findOne({ username });
				if (existingUser) {
					throw new Error("User already exists.");
				}

				const salt = await bcrypt.gensalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				const newUser = new User({
					username,
					name,
					password: hashedPAssword,
					gender,
					profilePicutre: gender === "male" ? boyProfilePic : girlProfilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (error) {
				console.log("Error in signUp: ", error);
				throw new Error(err.message || "Internal server error.");
			}
		},

		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				const { user } = await context.authenticate("graphql-local", {
					username,
					password,
				});
				await context.login(user);
				return user;
			} catch (error) {
				console.log("Error in login: ", error);
				throw new Error(err.message || "Internal server error.");
			}
		},
		logout: async (_, _, context) => {
			try {
				await context.logout();
				req.session.destroy((err) => {
					if (err) throw err;
				});
				res.clearCookie("connect.sid");

				return { messsage: "Logged out successfully" };
			} catch (error) {
				console.log("Error in logout: ", error);
				throw new Error(err.message || "Internal server error.");
			}
		},
	},
	Query: {
		authUser: async (_, _, context) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (error) {
				console.log("Error in authUser: ", error);
				throw new Error("Internal server error.");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
				return user;
			} catch (error) {
				console.log("Error in user query: ", error);
				throw new Error(error.message || "Error getting user");
			}
		},
	},
	// TODO add user transaction relation
};
export default userResolver;
