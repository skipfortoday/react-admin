const AbsensiManualValidation = (values) => {
    const errors = {};
  
    if (!values.Shift || values.Shift === "") {
      errors.Shift = "Shift harus diisi";
    }
  
    if (!values.Keterangan || values.Keterangan === "") {
      errors.Keterangan = "Keterangan Di isi";
    } else {
      if ( values.Keterangan.length > 200) {
        errors.Keterangan = "Terlalu Panjang";
      }
    } 

    if (!values.KetIstirahatKeluar || values.KetIstirahatKeluar === "") {
      errors.KetIstirahatKeluar = "Keterangan Di isi";
    } else {
      if ( values.KetIstirahatKeluar.length > 200) {
        errors.KetIstirahatKeluar = "Terlalu Panjang";
      }
    } 

    if (!values.KetIstirahatKembali || values.KetIstirahatKembali === "") {
      errors.KetIstirahatKembali = "Keterangan Di isi";
    } else {
      if ( values.KetIstirahatKembali.length > 200) {
        errors.KetIstirahatKembali = "Terlalu Panjang";
      }
    } 

    if (!values.KeteranganKembali || values.KeteranganKembali === "") {
      errors.KeteranganKembali = "Keterangan Di isi";
    } else {
      if ( values.KeteranganKembali.length > 200) {
        errors.KeteranganKembali = "Terlalu Panjang";
      }
    } 

    if (!values.KetPulang || values.KetPulang === "") {
      errors.KetPulang = "Keterangan Di isi";
    } else {
      if ( values.KetPulang.length > 200) {
        errors.KetPulang = "Terlalu Panjang";
      }
    } 

  
    return errors;
  };
  
  export default AbsensiManualValidation;
  