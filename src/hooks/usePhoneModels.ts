import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

// Fallback phone models in case Supabase fetch fails
const PHONE_MODELS: string[] = [
  'iPhone 11',
  'iPhone 11 Pro',
  'iPhone 12',
  'iPhone 12 Pro',
  'iPhone 12 Pro Max',
  'iPhone 13',
  'iPhone 13 Pro',
  'iPhone 13 Pro Max',
  'iPhone 14',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max'
];

let cachedModels: string[] | null = null;
let isLoading = false;
let subscribers: Array<(models: string[]) => void> = [];

export const usePhoneModels = () => {
  const [models, setModels] = useState<string[]>(cachedModels || PHONE_MODELS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedModels) { // If models are already cached, use them 
      setModels(cachedModels);
      return;
    }

    if (isLoading) { // If already loading, subscribe to changes
      const unsubscribe = (newModels: string[]) => {
        setModels(newModels);
        setLoading(false);
      };
      subscribers.push(unsubscribe);
      setLoading(true);
      
      return () => {
        subscribers = subscribers.filter(sub => sub !== unsubscribe);
      };
    }

    // Load models from Supabase
    const fetchModels = async () => {
      isLoading = true;
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('phone_model')
          .select('name')
          .order('name');

        if (error) {
          console.warn('Error fetching phone models from Supabase, using fallback:', error);
          cachedModels = PHONE_MODELS;
          setModels(PHONE_MODELS);
        } else {
          const modelNames = data?.map((item: { name: string }) => item.name) || PHONE_MODELS;
          cachedModels = modelNames;
          setModels(modelNames);

          // Notify subscribers
          subscribers.forEach(callback => callback(modelNames));
        }
      } catch (err) {
        console.warn('Failed to fetch phone models, using fallback:', err);
        setError('Error al cargar modelos desde la base de datos');
        cachedModels = PHONE_MODELS;
        setModels(PHONE_MODELS);
      } finally {
        isLoading = false;
        setLoading(false);
        subscribers = [];
      }
    };

    fetchModels();
  }, []);

  return {
    models,
    loading,
    error,
    // Get models synchronously
    getModelsSync: () => cachedModels || PHONE_MODELS,
    // Refresh models from Supabase
    refreshModels: async () => {
      cachedModels = null;
      const { data, error } = await supabase
        .from('phone_model')
        .select('name')
        .order('name');
      
      if (!error && data) {
        const modelNames = data.map((item: { name: string }) => item.name);
        cachedModels = modelNames;
        setModels(modelNames);
        return modelNames;
      }
      
      cachedModels = PHONE_MODELS;
      setModels(PHONE_MODELS);
      return PHONE_MODELS;
    }
  };
};