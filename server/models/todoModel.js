const mongoose = require('mongoose');

const todoSchema = ({
  //   title: {
  //     type: String,
  //     required: [true, 'title is required']
  //   },
  //   isCompleted: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
    text:{
      type:String,
      require:true
  },
  // { timestamps: true }
});

module.exports = mongoose.model('todo', todoSchema);
