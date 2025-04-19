export const fileUpload = (req, res) => {
    try {
        if (req.file) {
            return res.status(200).json({
                status: true,
                filename: req.file.filename,
                file: req.file,
                msg: "Files uploaded successfully",
            });
        } else {
            return res.status(400).json({ status: false, msg: "No files uploaded" });
        }
    } catch (e) {
        console.error("Upload Error:", e);
        return res.status(500).json({ status: false, error: e.message });
    }
};
