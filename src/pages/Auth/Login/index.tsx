import { Button, Input } from "antd";
import React, { FC, useState } from "react";

interface FormType {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [formValue, setFormValue] = useState<FormType>({
    email: "",
    password: "",
  });
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formValue.email}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={formValue.password}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button htmlType="submit">LOGIN</Button>
      </form>
    </div>
  );
};

export default Login;
