import React, { FC, useState } from 'react';
import TopNav from '../../components/Dashboard/TopNav';
import Sidebar from '../../components/Dashboard/Sidebar';
import QuickActions from '../../components/Dashboard/QuickActions';
import FormCard from '../../components/Dashboard/FormCard';
import EmptyState from '../../components/Dashboard/EmptyState';
import { User } from '@/types/auth';
import { useQuery } from '@tanstack/react-query';

type FormItem = {
    id: number;
    title: string;
    description: string;
    slug: string;
    content: {
        questions: Array<{
            type: string;
            question: string;
            options?: string[];
        }>;
    };
};

type DashboardProps = {
    profile: User;
};

const fetchForms = async (): Promise<FormItem[]> => {
    const res = await fetch('/api/v1/get_forms');
    if (!res.ok) {
        throw new Error('Failed to fetch forms');
    }
    const data = (await res.json()) as { forms: FormItem[] };
    return data.forms;
};

const Dashboard: FC<DashboardProps> = ({ profile }) => {
    const { data: forms, isLoading } = useQuery({ queryKey: ['forms_dashboard'], queryFn: fetchForms });

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav profile={profile} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col gap-6 md:flex-row">
                    <Sidebar />

                    <main className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
                                <p className="mt-1 text-sm text-gray-500">Create beautiful forms and collect responses easily.</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <QuickActions onCreate={() => alert('Create new form')} onTemplate={() => alert('Open templates')} />
                        </div>

                        <section>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Your forms</h2>
                                <p className="text-sm text-gray-500">Manage and view responses</p>
                            </div>
                            {forms && !isLoading && forms.length === 0 ? (
                                <EmptyState onCreate={() => alert('Create new form')} />
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {forms?.map((f) => (
                                        <FormCard key={f.id} id={f.id} title={f.title} description={f.description} />
                                    ))}
                                </div>
                            )}
                            {!forms && isLoading && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {Array.from({ length: 6 }).map((_, n) => (
                                        <div key={n} className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
