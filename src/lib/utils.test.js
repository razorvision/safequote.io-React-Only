import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge multiple class names', () => {
      const result = cn('foo', 'bar', 'baz');
      expect(result).toBe('foo bar baz');
    });

    it('should handle conditional classes', () => {
      const result = cn('foo', false && 'bar', 'baz');
      expect(result).toBe('foo baz');
    });

    it('should handle undefined and null values', () => {
      const result = cn('foo', undefined, null, 'bar');
      expect(result).toBe('foo bar');
    });

    it('should handle array of classes', () => {
      const result = cn(['foo', 'bar'], 'baz');
      expect(result).toBe('foo bar baz');
    });

    it('should handle object with boolean values', () => {
      const result = cn({ foo: true, bar: false, baz: true });
      expect(result).toBe('foo baz');
    });

    it('should merge Tailwind classes correctly (resolve conflicts)', () => {
      // twMerge should handle conflicting Tailwind classes
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle mixed types', () => {
      const result = cn(
        'base',
        { active: true, disabled: false },
        ['extra', 'classes'],
        undefined,
        'final'
      );
      expect(result).toBe('base active extra classes final');
    });

    it('should not deduplicate non-conflicting classes', () => {
      // clsx and twMerge don't deduplicate non-Tailwind classes
      const result = cn('foo', 'bar', 'foo');
      expect(result).toBe('foo bar foo');
    });

    it('should handle complex Tailwind class conflicts', () => {
      // Test that later classes override earlier ones
      const result = cn('text-sm text-base', 'text-lg');
      expect(result).toBe('text-lg');
    });
  });
});
