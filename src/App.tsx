import React, { useState } from 'react';
import LogoBadge from './shared/ui/LogoBadge/LogoBadge'
import BaseInput from './shared/ui/BaseInput/BaseInput'
import InputGroup from './shared/ui/InputGroup/InputGroup'

import MailIcon from './shared/ui/icon/MailIcon'
import EyeIcon from './shared/ui/icon/EyeIcon'
import LockIcon from './shared/ui/icon/LockIcon'



export const App = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-black text-teal-400 underline">
        React + TS + Tailwind v4
      </h1>
     <div className="">
        <LogoBadge />
        <InputGroup
          label="Email"
          name="password" 
          placeholder="example@mail.com"
          leftIcon={<MailIcon size={24} />}
        />
        <InputGroup
          label="Пароль"
          name="password" 
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<LockIcon size={24} />}
          rightIcon={<EyeIcon size={24} isHidden={!showPassword} />}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />
      </div>

    </div>
  )
}

export default App

