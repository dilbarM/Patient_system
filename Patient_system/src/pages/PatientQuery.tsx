import React, { useState } from 'react';
import { executeQuery } from '../services/DatabaseService';
import { useDatabaseContext } from '../context/DatabaseContext';
import { Database,Copy, Download } from 'lucide-react';

interface QueryResult {
  success: boolean;
  data: any[];
  error: string | null;
}

const PatientQuery: React.FC = () => {
  const { isInitialized } = useDatabaseContext();
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM patients');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSqlQuery(e.target.value);
  };

  const executeCustomQuery = async () => {
    if (!sqlQuery.trim()) return;

    setIsExecuting(true);

    try {
      const result = await executeQuery(sqlQuery);
      setQueryResult(result);
    } catch (error: any) {
      setQueryResult({
        success: false,
        data: [],
        error: error.message || 'An error occurred while executing the query',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadResults = () => {
    if (!queryResult?.data || queryResult.data.length === 0) return;

    const jsonStr = JSON.stringify(queryResult.data, null, 2);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "patient_query_results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient Query</h1>
        <p className="mt-2 text-sm text-gray-600">
          Run custom SQL queries against the patient database
        </p>
      </header>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">

          <div className="mb-6">
            <label htmlFor="sqlQuery" className="block text-sm font-medium text-gray-700 mb-2">
              SQL Query
            </label>
            <textarea
              id="sqlQuery"
              rows={6}
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-400 focus:outline-none resize-y transition"
              value={sqlQuery}
              onChange={handleQueryChange}
              placeholder="Enter your SQL query here..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={executeCustomQuery}
              disabled={isExecuting}
              className="btn btn-primary inline-flex items-center px-4 py-2 rounded-md bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExecuting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Executing..
                </>
              ) : (
                <>
                  <Database className="h-5 w-5 mr-2" /> Run Query
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {queryResult && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Query results</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(JSON.stringify(queryResult.data, null, 2))}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  disabled={!queryResult.success || queryResult.data.length === 0}
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4 mr-1 text-success-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" /> Copy json
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={downloadResults}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  disabled={!queryResult.success || queryResult.data.length === 0}
                >
                  <Download className="h-4 w-4 mr-1" /> Download json
                </button>
              </div>
            </div>

            {!queryResult.success ? (
              <div className="bg-error-50 border-l-4 border-error-600 p-4">
                <div className="text-error-700 font-semibold">Error:</div>
                <pre className="whitespace-pre-wrap text-error-700 mt-1">{queryResult.error}</pre>
              </div>
            ) : queryResult.data.length === 0 ? (
              <div className="text-gray-500">No data</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(queryResult.data[0]).map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {queryResult.data.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {Object.values(row).map((value, j) => (
                          <td
                            key={j}
                            className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-900 border-b border-gray-200"
                          >
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientQuery;
