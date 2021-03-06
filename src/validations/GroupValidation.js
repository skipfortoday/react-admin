const GroupValidation = (values) => {
    const errors = {};
  
    if (!values.GroupID || values.GroupID === "") {
      errors.GroupID = "Group ID harus diisi";
    }
  
    if (!values.Jabatan || values.Jabatan === "") {
      errors.Jabatan = "Nama Group harus diisi";
    }
  
    if (!values.JamDatang || values.JamDatang === "") {
      errors.JamDatang = "Jam Datang Pagi harus diisi";
    }
  
    if (!values.JamPulang || values.JamPulang === "") {
      errors.JamPulang = "Jam Pulang Pagi harus diisi";
    }
  
    if (!values.MaxJamDatang || values.MaxJamDatang === "") {
      errors.MaxJamDatang = "Max Jam Datang Pagi Harus diisi ";
    }

    if (!values.MinJamLembur || values.MinJamLembur === "") {
      errors.MinJamLembur = "Min Jam Lembur Pagi Harus diisi ";
    }

    if (values.RpLemburPerJam === false || values.RpLemburPerJam === "") {
      errors.RpLemburPerJam = "RpLemburPerJam harus diisi";
    }
  
    if (!values.RpPotonganTerlambat || values.RpPotonganTerlambat === "") {
      errors.RpPotonganTerlambat = "RpPotonganTerlambat Pagi harus diisi";
    }
  
    if (!values.RpPotonganTerlambatKembali || values.RpPotonganTerlambatKembali === "") {
      errors.RpPotonganTerlambatKembali = "RpPotonganTerlambatKembali Pagi harus diisi";
    }
  
    if (!values.RpPotonganTidakMasuk || values.RpPotonganTidakMasuk === "") {
      errors.RpPotonganTidakMasuk = "RpPotonganTidakMasuk Harus diisi ";
    }
  
    return errors;
  };
  
  export default GroupValidation;