import app from "./src/app.js";
import connectToDb from "./src/database/db.js";

connectToDb();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT nuber 3000");
});
