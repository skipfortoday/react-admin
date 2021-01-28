const UserValidation = (values) => {
  const errors = {};

  if (!values.Nama || values.Nama === "") {
    errors.Nama = "Nama harus diisi";
  }

  if (!values.Alamat || values.Alamat=== "") {
    errors.Alamat = "Alamat harus diisi";
  }

  if (!values.TglLahir || values.TglLahir=== "") {
    errors.TglLahir = "Tanggal Lahir harus diisi";
  }

  if (!values.HP|| values.HP=== "") {
    errors.HP = "Nomor HP harus diisi";
  }
  if (!values.KodeCabang || values.KodeCabang=== "") {
    errors.KodeCabang = "Kode harus diisi";
  } else if (values.KodeCabang.length >3 || values.KodeCabang.length <3 ) {
    errors.KodeCabang = 'Masukan Kode Cabang Yang Benar';
  } else if (values.KodeCabang !== 'SB1' && values.KodeCabang !== 'SB2' ) {
    errors.KodeCabang = 'Masukan Kode Cabang Yang Benar Contoh SB1';
  } 

  if (!values.TglMasuk || values.TglMasuk=== "") {
    errors.TglMasuk = "Tanggal Masuk harus diisi";
  }

  if (!values.TglAwalKontrakPertama || values.TglAwalKontrakPertama=== "") {
    errors.TglAwalKontrakPertama = "Tanggal Awal Kontrak harus diisi";
  }

  if (!values.TglMulaiCuti || values.TglAwalMulaiCuti=== "") {
    errors.TglMulaiCuti = "Tanggal Awal Kontrak harus diisi";
  }

  if (!values.UserID || values.UserID === "") {
    errors.UserID = "UserID harus diisi"; 
  }  else if (['SB1', 'SB2', 'SB3', 'SB4'].includes(values.UserID)) {
    errors.UserID = 'User ID Sudah Digunakan';
  }


  if (!values.Pass || values.Pass === "") {
    errors.Pass = "Password harus diisi";
  } else if (values.Pass.length > 6 || values.Pass.length < 6 ) {
    errors.Pass = 'Harus 6 dijit bos';
  }

  if (!values.GroupID || values.GroupID === "") {
    errors.GroupID = "Group ID harus diisi";
  } else if (values.GroupID.length >3 || values.GroupID.length <3 ) {
    errors.GroupID = 'Masukan Group ID Yang Benar';
  }



  return errors;
};

export default UserValidation;
