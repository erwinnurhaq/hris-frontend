import { Button, Card, Input, Select } from 'antd';
import './style.css';

function Welcome() {
  return (
    <div className="welcome-container animation-fade-in-top">
      <h1>Selamat Datang</h1>
      <Card className="welcome-card">
        <p>Silahkan lengkapi data sekolah anda:</p>
        <form>
          <div className="input-container">
            <p>Nama Sekolah:</p>
            <Input type="text" name="name" placeholder="Masukkan nama sekolah anda" required />
          </div>
          <div className="input-container">
            <p>Alamat:</p>
            <Input type="text" name="address" placeholder="Masukkan alamat sekolah anda" required />
          </div>
          <div className="input-container">
            <p>Jenjang Sekolah:</p>
            <Select placeholder="Pilih salah satu jenjang sekolah" onChange={(e) => console.log(e)}>
              <Select.Option value="SD">SD</Select.Option>
              <Select.Option value="SMP">SMP</Select.Option>
              <Select.Option value="SMA">SMA</Select.Option>
              <Select.Option value="SMK">SMK</Select.Option>
            </Select>
          </div>
          <div className="input-container">
            <p>Tipe Sekolah:</p>
            <Select placeholder="Pilih salah satu tipe sekolah" onChange={(e) => console.log(e)}>
              <Select.Option value="NEGERI">NEGERI</Select.Option>
              <Select.Option value="SWASTA">SWASTA</Select.Option>
            </Select>
          </div>
          <div className="input-container">
            <p>Keterangan:</p>
            <Input.TextArea
              name="description"
              placeholder="Keterangan mengenai sekolah anda"
              rows={3}
              required
            />
          </div>
          <Button type="primary" className="welcome-save-button">
            SIMPAN
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Welcome;
