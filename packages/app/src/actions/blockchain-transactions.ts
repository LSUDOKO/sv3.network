'use server';

import db from '@/db';
import { BlockchainTransaction } from '@/db/types';
import { BlockchainNetwork } from '@/db/enums';
import { revalidatePath } from 'next/cache';

// Create a new blockchain transaction
export async function createBlockchainTransaction(options: {
  transaction_hash: string;
  blockchain_network: BlockchainNetwork;
  block_number?: number;
  block_hash?: string;
  from_address: string;
  to_address?: string;
  contract_address?: string;
  function_name?: string;
  gas_limit?: number;
  gas_used?: number;
  gas_price?: string;
  transaction_fee?: string;
  status?: 'pending' | 'confirmed' | 'failed';
  confirmations?: number;
  user_id?: string;
  organization_id?: string;
  document_id?: string;
  signature_id?: string;
  input_data?: string;
  logs?: Array<{
    address: string;
    topics: string[];
    data: string;
  }>;
  metadata?: {
    purpose?: string;
    retry_count?: number;
    error_message?: string;
    nonce?: number;
  };
}): Promise<BlockchainTransaction> {
  try {
    const transaction = await db
      .insertInto('blockchain_transactions')
      .values({
        transaction_hash: options.transaction_hash,
        blockchain_network: options.blockchain_network,
        block_number: options.block_number || null,
        block_hash: options.block_hash || null,
        from_address: options.from_address,
        to_address: options.to_address || null,
        contract_address: options.contract_address || null,
        function_name: options.function_name || null,
        gas_limit: options.gas_limit || null,
        gas_used: options.gas_used || null,
        gas_price: options.gas_price || null,
        transaction_fee: options.transaction_fee || null,
        status: options.status || 'pending',
        confirmations: options.confirmations || 0,
        user_id: options.user_id || null,
        organization_id: options.organization_id || null,
        document_id: options.document_id || null,
        signature_id: options.signature_id || null,
        input_data: options.input_data || null,
        logs: JSON.stringify(options.logs || null),
        metadata: JSON.stringify(options.metadata || {}),
      })
      .returning([
        'id',
        'transaction_hash',
        'blockchain_network',
        'block_number',
        'block_hash',
        'from_address',
        'to_address',
        'contract_address',
        'function_name',
        'gas_limit',
        'gas_used',
        'gas_price',
        'transaction_fee',
        'status',
        'confirmations',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'input_data',
        'logs',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/blockchain');
    revalidatePath('/transactions');

    return transaction as BlockchainTransaction;
  } catch (error) {
    console.error('Error creating blockchain transaction:', error);
    throw new Error('Failed to create blockchain transaction');
  }
}

// Get blockchain transaction by ID
export async function getBlockchainTransactionById(id: string): Promise<BlockchainTransaction | null> {
  try {
    const transaction = await db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return transaction as BlockchainTransaction | null;
  } catch (error) {
    console.error('Error fetching blockchain transaction:', error);
    throw new Error('Failed to fetch blockchain transaction');
  }
}

// Get blockchain transaction by hash
export async function getBlockchainTransactionByHash(
  transactionHash: string,
  network?: BlockchainNetwork
): Promise<BlockchainTransaction | null> {
  try {
    let query = db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where('transaction_hash', '=', transactionHash);

    if (network) {
      query = query.where('blockchain_network', '=', network);
    }

    const transaction = await query.executeTakeFirst();

    return transaction as BlockchainTransaction | null;
  } catch (error) {
    console.error('Error fetching blockchain transaction by hash:', error);
    throw new Error('Failed to fetch blockchain transaction by hash');
  }
}

// Get blockchain transactions with pagination and filters
export async function getBlockchainTransactions(options?: {
  user_id?: string;
  organization_id?: string;
  document_id?: string;
  signature_id?: string;
  blockchain_network?: BlockchainNetwork;
  status?: 'pending' | 'confirmed' | 'failed';
  from_address?: string;
  to_address?: string;
  contract_address?: string;
  function_name?: string;
  block_number_min?: number;
  block_number_max?: number;
  limit?: number;
  offset?: number;
}): Promise<{
  transactions: BlockchainTransaction[];
  total: number;
}> {
  try {
    let query = db.selectFrom('blockchain_transactions').selectAll();

    if (options?.user_id) {
      query = query.where('user_id', '=', options.user_id);
    }

    if (options?.organization_id) {
      query = query.where('organization_id', '=', options.organization_id);
    }

    if (options?.document_id) {
      query = query.where('document_id', '=', options.document_id);
    }

    if (options?.signature_id) {
      query = query.where('signature_id', '=', options.signature_id);
    }

    if (options?.blockchain_network) {
      query = query.where('blockchain_network', '=', options.blockchain_network);
    }

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    if (options?.from_address) {
      query = query.where('from_address', '=', options.from_address);
    }

    if (options?.to_address) {
      query = query.where('to_address', '=', options.to_address);
    }

    if (options?.contract_address) {
      query = query.where('contract_address', '=', options.contract_address);
    }

    if (options?.function_name) {
      query = query.where('function_name', '=', options.function_name);
    }

    if (options?.block_number_min) {
      query = query.where('block_number', '>=', options.block_number_min);
    }

    if (options?.block_number_max) {
      query = query.where('block_number', '<=', options.block_number_max);
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const transactions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      transactions: transactions as BlockchainTransaction[],
      total,
    };
  } catch (error) {
    console.error('Error fetching blockchain transactions:', error);
    throw new Error('Failed to fetch blockchain transactions');
  }
}

// Update blockchain transaction
export async function updateBlockchainTransaction(
  id: string,
  updates: {
    block_number?: number;
    block_hash?: string;
    gas_used?: number;
    transaction_fee?: string;
    status?: 'pending' | 'confirmed' | 'failed';
    confirmations?: number;
    logs?: Array<{
      address: string;
      topics: string[];
      data: string;
    }>;
    metadata?: {
      purpose?: string;
      retry_count?: number;
      error_message?: string;
      nonce?: number;
    };
  }
): Promise<BlockchainTransaction> {
  try {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.block_number !== undefined) {
      updateData.block_number = updates.block_number;
    }

    if (updates.block_hash !== undefined) {
      updateData.block_hash = updates.block_hash;
    }

    if (updates.gas_used !== undefined) {
      updateData.gas_used = updates.gas_used;
    }

    if (updates.transaction_fee !== undefined) {
      updateData.transaction_fee = updates.transaction_fee;
    }

    if (updates.status !== undefined) {
      updateData.status = updates.status;
    }

    if (updates.confirmations !== undefined) {
      updateData.confirmations = updates.confirmations;
    }

    if (updates.logs !== undefined) {
      updateData.logs = JSON.stringify(updates.logs);
    }

    if (updates.metadata !== undefined) {
      updateData.metadata = JSON.stringify(updates.metadata);
    }

    const transaction = await db
      .updateTable('blockchain_transactions')
      .set(updateData)
      .where('id', '=', id)
      .returning([
        'id',
        'transaction_hash',
        'blockchain_network',
        'block_number',
        'block_hash',
        'from_address',
        'to_address',
        'contract_address',
        'function_name',
        'gas_limit',
        'gas_used',
        'gas_price',
        'transaction_fee',
        'status',
        'confirmations',
        'user_id',
        'organization_id',
        'document_id',
        'signature_id',
        'input_data',
        'logs',
        'metadata',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirstOrThrow();

    revalidatePath('/blockchain');
    revalidatePath('/transactions');
    revalidatePath(`/transactions/${id}`);

    return transaction as BlockchainTransaction;
  } catch (error) {
    console.error('Error updating blockchain transaction:', error);
    throw new Error('Failed to update blockchain transaction');
  }
}

// Delete blockchain transaction
export async function deleteBlockchainTransaction(id: string): Promise<void> {
  try {
    await db
      .deleteFrom('blockchain_transactions')
      .where('id', '=', id)
      .execute();

    revalidatePath('/blockchain');
    revalidatePath('/transactions');
  } catch (error) {
    console.error('Error deleting blockchain transaction:', error);
    throw new Error('Failed to delete blockchain transaction');
  }
}

// Get pending transactions
export async function getPendingTransactions(
  network?: BlockchainNetwork,
  limit?: number
): Promise<BlockchainTransaction[]> {
  try {
    let query = db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where('status', '=', 'pending');

    if (network) {
      query = query.where('blockchain_network', '=', network);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const transactions = await query
      .orderBy('created_at', 'asc')
      .execute();

    return transactions as BlockchainTransaction[];
  } catch (error) {
    console.error('Error fetching pending transactions:', error);
    throw new Error('Failed to fetch pending transactions');
  }
}

// Get failed transactions
export async function getFailedTransactions(
  network?: BlockchainNetwork,
  limit?: number
): Promise<BlockchainTransaction[]> {
  try {
    let query = db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where('status', '=', 'failed');

    if (network) {
      query = query.where('blockchain_network', '=', network);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const transactions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return transactions as BlockchainTransaction[];
  } catch (error) {
    console.error('Error fetching failed transactions:', error);
    throw new Error('Failed to fetch failed transactions');
  }
}

// Get transactions by address
export async function getTransactionsByAddress(
  address: string,
  options?: {
    network?: BlockchainNetwork;
    type?: 'from' | 'to' | 'contract' | 'all';
    status?: 'pending' | 'confirmed' | 'failed';
    limit?: number;
    offset?: number;
  }
): Promise<{
  transactions: BlockchainTransaction[];
  total: number;
}> {
  try {
    let query = db.selectFrom('blockchain_transactions').selectAll();

    // Filter by address type
    if (options?.type === 'from') {
      query = query.where('from_address', '=', address);
    } else if (options?.type === 'to') {
      query = query.where('to_address', '=', address);
    } else if (options?.type === 'contract') {
      query = query.where('contract_address', '=', address);
    } else {
      // Default: all types
      query = query.where((eb) =>
        eb.or([
          eb('from_address', '=', address),
          eb('to_address', '=', address),
          eb('contract_address', '=', address),
        ])
      );
    }

    if (options?.network) {
      query = query.where('blockchain_network', '=', options.network);
    }

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const transactions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return {
      transactions: transactions as BlockchainTransaction[],
      total,
    };
  } catch (error) {
    console.error('Error fetching transactions by address:', error);
    throw new Error('Failed to fetch transactions by address');
  }
}

// Get transactions by block range
export async function getTransactionsByBlockRange(
  network: BlockchainNetwork,
  fromBlock: number,
  toBlock: number,
  options?: {
    status?: 'pending' | 'confirmed' | 'failed';
    limit?: number;
    offset?: number;
  }
): Promise<{
  transactions: BlockchainTransaction[];
  total: number;
}> {
  try {
    let query = db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where('blockchain_network', '=', network)
      .where('block_number', '>=', fromBlock)
      .where('block_number', '<=', toBlock);

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    // Get total count
    const totalQuery = query.select(db.fn.count('id').as('count'));
    const totalResult = await totalQuery.executeTakeFirstOrThrow();
    const total = Number(totalResult.count);

    // Get paginated results
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const transactions = await query
      .orderBy('block_number', 'desc')
      .orderBy('created_at', 'desc')
      .execute();

    return {
      transactions: transactions as BlockchainTransaction[],
      total,
    };
  } catch (error) {
    console.error('Error fetching transactions by block range:', error);
    throw new Error('Failed to fetch transactions by block range');
  }
}

// Get transaction statistics
export async function getTransactionStats(
  options?: {
    network?: BlockchainNetwork;
    user_id?: string;
    organization_id?: string;
    days?: number;
  }
): Promise<{
  total: number;
  by_status: Record<'pending' | 'confirmed' | 'failed', number>;
  by_network: Record<BlockchainNetwork, number>;
  total_gas_used: number;
  total_fees: string;
  average_confirmations: number;
}> {
  try {
    let baseQuery = db.selectFrom('blockchain_transactions');

    if (options?.network) {
      baseQuery = baseQuery.where('blockchain_network', '=', options.network);
    }

    if (options?.user_id) {
      baseQuery = baseQuery.where('user_id', '=', options.user_id);
    }

    if (options?.organization_id) {
      baseQuery = baseQuery.where('organization_id', '=', options.organization_id);
    }

    if (options?.days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - options.days);
      baseQuery = baseQuery.where('created_at', '>=', cutoffDate);
    }

    const [total, byStatus, byNetwork, gasStats, confirmationStats] = await Promise.all([
      baseQuery.select(db.fn.count('id').as('count')).executeTakeFirstOrThrow(),
      baseQuery
        .select(['status', db.fn.count('id').as('count')])
        .groupBy('status')
        .execute(),
      baseQuery
        .select(['blockchain_network', db.fn.count('id').as('count')])
        .groupBy('blockchain_network')
        .execute(),
      baseQuery
        .select([
          db.fn.sum('gas_used').as('total_gas'),
          db.fn.count('transaction_fee').as('fee_count'),
        ])
        .executeTakeFirstOrThrow(),
      baseQuery
        .select(db.fn.avg('confirmations').as('avg_confirmations'))
        .executeTakeFirstOrThrow(),
    ]);

    const statusStats: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      failed: 0,
    };
    byStatus.forEach((stat: { status: string; count: string | number | bigint }) => {
      statusStats[stat.status] = Number(stat.count);
    });

    const networkStats: Record<string, number> = {};
    byNetwork.forEach((stat: { blockchain_network: BlockchainNetwork; count: string | number | bigint }) => {
      networkStats[stat.blockchain_network] = Number(stat.count);
    });

    return {
      total: Number(total.count),
      by_status: statusStats as Record<'pending' | 'confirmed' | 'failed', number>,
      by_network: networkStats as Record<BlockchainNetwork, number>,
      total_gas_used: Number(gasStats.total_gas || 0),
      total_fees: '0', // Would need to sum transaction_fee strings properly
      average_confirmations: Number(confirmationStats.avg_confirmations || 0),
    };
  } catch (error) {
    console.error('Error getting transaction statistics:', error);
    throw new Error('Failed to get transaction statistics');
  }
}

// Retry failed transaction
export async function retryFailedTransaction(
  id: string,
  newTransactionHash: string
): Promise<BlockchainTransaction> {
  try {
    // Get the original transaction
    const originalTransaction = await getBlockchainTransactionById(id);
    if (!originalTransaction) {
      throw new Error('Transaction not found');
    }

    if (originalTransaction.status !== 'failed') {
      throw new Error('Can only retry failed transactions');
    }

    // Update metadata to track retry
    const currentMetadata = originalTransaction.metadata || {};
    const retryCount = (currentMetadata.retry_count || 0) + 1;

    await updateBlockchainTransaction(id, {
      status: 'pending',
      confirmations: 0,
      metadata: {
        ...currentMetadata,
        retry_count: retryCount,
        error_message: undefined,
      },
    });

    // Create a new transaction record for the retry
    const retryTransaction = await createBlockchainTransaction({
      transaction_hash: newTransactionHash,
      blockchain_network: originalTransaction.blockchain_network,
      from_address: originalTransaction.from_address,
      to_address: originalTransaction.to_address || undefined,
      contract_address: originalTransaction.contract_address || undefined,
      function_name: originalTransaction.function_name || undefined,
      gas_limit: originalTransaction.gas_limit || undefined,
      gas_price: originalTransaction.gas_price || undefined,
      user_id: originalTransaction.user_id || undefined,
      organization_id: originalTransaction.organization_id || undefined,
      document_id: originalTransaction.document_id || undefined,
      signature_id: originalTransaction.signature_id || undefined,
      input_data: originalTransaction.input_data || undefined,
      metadata: {
        ...currentMetadata,
        purpose: `Retry of transaction ${originalTransaction.transaction_hash}`,
        retry_count: retryCount,
      },
    });

    return retryTransaction;
  } catch (error) {
    console.error('Error retrying failed transaction:', error);
    throw new Error('Failed to retry transaction');
  }
}

// Bulk update transaction confirmations
export async function bulkUpdateConfirmations(
  updates: Array<{
    transaction_hash: string;
    confirmations: number;
    status?: 'pending' | 'confirmed' | 'failed';
    block_number?: number;
    block_hash?: string;
  }>
): Promise<number> {
  try {
    let updatedCount = 0;

    for (const update of updates) {
      const transaction = await getBlockchainTransactionByHash(update.transaction_hash);
      if (transaction) {
        await updateBlockchainTransaction(transaction.id, {
          confirmations: update.confirmations,
          status: update.status,
          block_number: update.block_number,
          block_hash: update.block_hash,
        });
        updatedCount++;
      }
    }

    revalidatePath('/blockchain');
    revalidatePath('/transactions');

    return updatedCount;
  } catch (error) {
    console.error('Error bulk updating confirmations:', error);
    throw new Error('Failed to bulk update confirmations');
  }
}

// Get transaction analytics
export async function getTransactionAnalytics(
  network: BlockchainNetwork,
  days: number = 30
): Promise<{
  daily_volume: Array<{ date: string; count: number; gas_used: number }>;
  top_contracts: Array<{ address: string; count: number }>;
  top_functions: Array<{ name: string; count: number }>;
  success_rate: number;
}> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const baseQuery = db
      .selectFrom('blockchain_transactions')
      .where('blockchain_network', '=', network)
      .where('created_at', '>=', cutoffDate);

    const [topContracts, topFunctions, successRate] = await Promise.all([
      baseQuery
        .select(['contract_address', db.fn.count('id').as('count')])
        .where('contract_address', 'is not', null)
        .groupBy('contract_address')
        .orderBy('count', 'desc')
        .limit(10)
        .execute(),
      baseQuery
        .select(['function_name', db.fn.count('id').as('count')])
        .where('function_name', 'is not', null)
        .groupBy('function_name')
        .orderBy('count', 'desc')
        .limit(10)
        .execute(),
      baseQuery
        .select([
          db.fn.count('id').as('total'),
          db.fn
            .count('id')
            .filterWhere('status', '=', 'confirmed')
            .as('confirmed'),
        ])
        .executeTakeFirstOrThrow(),
    ]);

    const totalTransactions = Number(successRate.total);
    const confirmedTransactions = Number(successRate.confirmed);
    const successRatePercent = totalTransactions > 0 ? (confirmedTransactions / totalTransactions) * 100 : 0;

    return {
      daily_volume: [], // Would need to implement daily aggregation
      top_contracts: topContracts.map((contract: { contract_address: string | null; count: string | number | bigint }) => ({
        address: contract.contract_address ?? '',
        count: Number(contract.count),
      })),
      top_functions: topFunctions.map((func: { function_name: string | null; count: string | number | bigint }) => ({
        name: func.function_name ?? '',
        count: Number(func.count),
      })),
      success_rate: successRatePercent,
    };
  } catch (error) {
    console.error('Error getting transaction analytics:', error);
    throw new Error('Failed to get transaction analytics');
  }
}

// Search transactions
export async function searchTransactions(
  searchTerm: string,
  options?: {
    network?: BlockchainNetwork;
    status?: 'pending' | 'confirmed' | 'failed';
    limit?: number;
  }
): Promise<BlockchainTransaction[]> {
  try {
    let query = db
      .selectFrom('blockchain_transactions')
      .selectAll()
      .where((eb) =>
        eb.or([
          eb('transaction_hash', 'ilike', `%${searchTerm}%`),
          eb('from_address', 'ilike', `%${searchTerm}%`),
          eb('to_address', 'ilike', `%${searchTerm}%`),
          eb('contract_address', 'ilike', `%${searchTerm}%`),
          eb('function_name', 'ilike', `%${searchTerm}%`),
          eb('block_hash', 'ilike', `%${searchTerm}%`),
        ])
      );

    if (options?.network) {
      query = query.where('blockchain_network', '=', options.network);
    }

    if (options?.status) {
      query = query.where('status', '=', options.status);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const transactions = await query
      .orderBy('created_at', 'desc')
      .execute();

    return transactions as BlockchainTransaction[];
  } catch (error) {
    console.error('Error searching transactions:', error);
    throw new Error('Failed to search transactions');
  }
}