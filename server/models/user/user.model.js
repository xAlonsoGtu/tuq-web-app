const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.user_type = user.user_type;
  this.name = user.name;
  this.last_name = user.last_name;
  this.address = user.address;
  this.city = user.city;
  this.country = user.country;
  this.cp = user.cp;
  this.mobile_code = user.mobile_code;
  this.mobile = user.mobile;
  this.img_photo = user.img_photo;
  this.doc_idPhoto = user.doc_idPhoto;
  this.doc_idTax = user.doc_idTax;
  this.payment_method = user.payment_method;
  this.experience = user.experience;
  this.preferences = user.preferences;
  this.state = user.state;
  this.created = user.created;
  this.modified = user.modified;
};

module.exports = User;

