import React, { useState } from 'react';
import { Button, LoadingIndicator } from 'figma-ui-kit';
import { controller } from '../functions/utils';

export const Account = (props: { user: any }) => {
  const { user } = props;
  const [license, setLicense] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const { id_figma, status, trial_end, license_key } = user;

  const handleSubmit = async (e: any) => {
    const { id_figma } = user;
    try {
      setProcessing(true);
      let activateCall: any = await fetch(`${process.env.API_URI}/functions/v1/api/activate`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({ id_figma, license_key: license }),
      });
      const activateCallJson = await activateCall.json();
      if (activateCall.status !== 200) setError(activateCallJson.message.split('license_key').join('license key'));
      setProcessing(false);
      controller({ func: 'init', data: {} });
    } catch (e) {
      setError(e.message);
      setProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '15px' }}>
        <div style={{ width: '25%', fontWeight: 'bold' }} className="label">
          Figma ID
        </div>
        <div style={{ width: '25%' }} className="label">
          {id_figma}
        </div>
      </div>
      {/* <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '15px' }}>
        <div style={{ width: '25%', fontWeight: 'bold' }} className="label">
          Status
        </div>
        <div style={{ width: '25%' }} className="label">
          {status.split('-').join(' ')}
        </div>
      </div> */}
      {/* {Boolean(license_key) && (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '15px' }}>
          <div style={{ width: '25%', fontWeight: 'bold' }} className="label">
            License
          </div>
          <div style={{ width: '75%' }} className="label">
            ...{license_key}
          </div>
        </div>
      )} */}

      {/* {Boolean(!license_key) && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '15px' }}>
          <div style={{ width: '25%', fontWeight: 'bold' }} className="label">
            License Key
          </div>
          <div style={{ width: '100%' }}>
            <input
              onInput={(e) => setLicense(e.currentTarget.value)}
              disabled={processing}
              className="text-input border-bottom"
              type="text"
            />
          </div>
          {Boolean(error) && (
            <div style={{ width: '100%', color: '#ff0d31' }}>
              <p>{error}</p>
            </div>
          )}
          <div style={{ marginTop: '10px' }}>
            <Button
              onClick={handleSubmit}
              disabled={processing}
              secondary
              style={{ fontSize: '10px', height: '20px', lineHeight: '10px' }}
            >
              Submit
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};
