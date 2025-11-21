import {Input, Button} from 'antd'

export const TokenForm = ({token, onChange, onSave}) => (
    <>
      <div style={{marginBottom: 20}}>
        <label style={{display: 'block', marginBottom: 8}}>Токен</label>
        <Input
            value={token}
            onChange={onChange}
            placeholder="Введите токен"
        />
      </div>

      <Button
          onClick={onSave}
          disabled={!token}
          block
          type="primary"
          style={{marginBottom: 10}}
      >
        Продолжить
      </Button>
    </>
)
