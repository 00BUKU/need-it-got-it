const itemSchema = new Schema(
    {
        name: String,
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        userName: String,
        userAvatar: String,
        content: String
    },
    {
        timestamps: true,
    }
);