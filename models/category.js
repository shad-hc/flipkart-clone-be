import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: { type: String, default: '' },
    image: {
      url:       { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,             // null = top-level category
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// ─── Auto-generate slug from name ───────────────────────────────────────────
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-')
  }
  next()
})

const categoryModel = mongoose.model('Category', categorySchema)
module.exports = {
    categoryModel
}