const AbsensiManualValidation = (values) => {
  const errors = {};

  if (!values.Shift || values.Shift === "") {
    errors.Shift = "Shift harus diisi";
  } else {
    //errors.Shift = "Shift sudah diisi";
    if (parseInt(values.Shift.value) < parseInt(values.DefaultShift)) {
      if (!values.Keterangan || values.Keterangan === "") {
        errors.Keterangan = "Keterangan harus diisi";
      } else {
        if (values.Keterangan.length > 200) {
          errors.Keterangan = "Terlalu Panjang";
        }
      }
    }
  }

  if (!values.KeteranganKeluar || values.KeteranganKeluar === "") {
    errors.KeteranganKeluar = "Keterangan harus isi";
  } else {
    if (values.KeteranganKeluar.length > 200) {
      errors.KeteranganKeluar = "Terlalu Panjang";
    }
  }

  if (!values.KetIstirahatKeluar || values.KetIstirahatKeluar === "") {
    errors.KetIstirahatKeluar = "Keterangan Di isi";
  } else {
    if (values.KetIstirahatKeluar.length > 200) {
      errors.KetIstirahatKeluar = "Terlalu Panjang";
    }
  }

  if (!values.KetIstirahatKembali || values.KetIstirahatKembali === "") {
    errors.KetIstirahatKembali = "Keterangan harus diisi";
  } else {
    if (values.KetIstirahatKembali.length > 200) {
      errors.KetIstirahatKembali = "Terlalu Panjang";
    }
  }

  if (!values.KeteranganKembali || values.KeteranganKembali === "") {
    errors.KeteranganKembali = "Keterangan harus diisi";
  } else {
    if (values.KeteranganKembali.length > 200) {
      errors.KeteranganKembali = "Terlalu Panjang";
    }
  }


  if(values.NormalPulang == "10" || values.NormalPulang == "01" || values.NormalPulang == "NN"){
    if (!values.KetPulang || values.KetPulang === "") {
      errors.KetPulang = "Keterangan harus diisi";
    } else {
      if (values.KetPulang.length > 200) {
        errors.KetPulang = "Terlalu Panjang";
      }
    }
  }



  return errors;
};

export default AbsensiManualValidation;
