const UserValidation = (values) => {
  const errors = {};

  if (!values.Nama || values.Nama === "") {
    errors.Nama = "Nama harus diisi";
  }

  if (!values.NamaRole || values.NamaRole === "") {
    errors.NamaRole = "Role harus diisi";
  }

  if (!values.UserID || values.UserID === "") {
    errors.UserID = "UserID harus diisi";
  }

  if (!values.Pass || values.Pass === "") {
    errors.Pass = "Password harus diisi";
  }

  if (!values.IdGroups || values.IdGroups === "") {
    errors.IdGroups = "Id Groups harus diisi";
  }

  return errors;
};

export default UserValidation;
