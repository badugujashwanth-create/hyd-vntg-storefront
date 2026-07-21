import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

describe('Supabase schema boundary', () => {
  test('keeps public reads while restricting every mutation policy to server-assigned admins', () => {
    const schema = readFileSync('supabase/schema.sql', 'utf8');
    expect(schema).toContain('create policy "Public can view products"');
    expect(schema.match(/app_metadata/g)).toHaveLength(4);
    expect(schema.match(/role'\) = 'admin'/g)).toHaveLength(4);
    expect(schema).not.toMatch(/create policy "Authenticated users can/);
    expect(schema).not.toContain('with check (true)');
  });
});
