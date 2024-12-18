const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    permissions: {
        type: Array,
        default: []
    },
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    status: String,
    deleteAt: Date,
}, {
    timestamps: true
});


const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;