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
      errors.JamPulang = "Password harus diisi";
    }
  
    if (!values.HariLibur || values.HariLibur === "") {
      errors.HariLibur = "Hari Libur harus diisi";
    }
  
    return errors;
  };
  
  export default GroupValidation;