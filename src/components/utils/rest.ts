import { extractAuthToken } from '../auth/auth-helper';
import { debug } from './log';

export async function getOne<T = any>(url: string): Promise<T | undefined> {
  debug('GET', `${url}`);
  const singleRequest = await fetch(`${url}`, {
    headers: {
      Authorization: `Bearer ${await extractAuthToken()}`,
    },
  });

  if (singleRequest.status !== 200) {
    return undefined;
  }
  const symbolData = await singleRequest.json().catch(error => error);

  return symbolData as T;
}

export async function get<T = any>(url: string): Promise<T[] | undefined> {
  debug('GET', `${url}`);
  const request = await fetch(`${url}`, {
    headers: {
      Authorization: `Bearer ${await extractAuthToken()}`,
    },
  });

  if (request.status != 200) {
    return undefined;
  }

  const data: T[] = await request.json();
  return data || [];
}

export async function postOne<T = any>(url: string, formData: any): Promise<T | undefined> {
  debug('POST', `${url}`);

  const request = await fetch(`${url}`, {
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await extractAuthToken()}`,
    },
    method: 'POST',
  });
  if (request.status != 200) {
    return undefined;
  }

  const data: T = await request.json();
  return data;
}

export async function postOneWithFile<T = any>(url: string, formData: any): Promise<T | undefined> {
  debug('POST', `${url}`);

  const request = await fetch(`${url}`, {
    body: formData,
    headers: {
      Authorization: `Bearer ${await extractAuthToken()}`,
    },
    method: 'POST',
  });
  if (request.status != 200) {
    return undefined;
  }

  const data: T = await request.json();
  return data;
}
