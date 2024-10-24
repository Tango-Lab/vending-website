import { TotalAmount } from '@/app/(private)/admin/dashboard/page';
import { useApi } from '@/core';
import { getTotalAmount } from '@/service/dashboards';

export const useDailyTotal = (machine: string, selectMachine: string) => {
  const {
    response: amount,
    loading,
    error,
  } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: { machine },
    effects: [selectMachine],
  });

  return { amount, loading, error };
};

export const useWeeklyTotal = (machine: string, weekRange: { start: string; end: string }, selectMachine: string) => {
  const {
    response: weekly,
    loading,
    error,
  } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: { machine, from: weekRange.start, to: weekRange.end },
    effects: [selectMachine],
  });

  return { weekly, loading, error };
};

export const getMonthlyTotal = (machine: string, monthRange: { start: string; end: string }, selectMachine: string) => {
  const {
    response: monthly,
    loading,
    error,
  } = useApi<TotalAmount>({
    service: getTotalAmount,
    params: { machine, from: monthRange.start, to: monthRange.end },
    effects: [selectMachine],
  });

  return { monthly, loading, error };
};
