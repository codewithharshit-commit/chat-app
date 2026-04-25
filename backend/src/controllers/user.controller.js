import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "chat-app/profile-pics",
      public_id: `${userId}_profile_pic`,
      overwrite: true,
    });

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
