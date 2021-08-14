import {Fetcher, replaceNullValues} from 'graphql-ts-client-api';
import {graphQLClient} from '../Environment';

export async function findEmployees<X extends object>(
	args: FindEmployeesArgs, 
	fetcher: Fetcher<'Employee', X>
): Promise<readonly X[]> {
	const gql = `
		query(
			$mockedErrorProbability: Int, 
			$supervisorId: String, 
			$departmentId: Int, 
			$namePattern: String
		) {
			findEmployees(
				mockedErrorProbability: $mockedErrorProbability, 
				supervisorId: $supervisorId, 
				departmentId: $departmentId, 
				namePattern: $namePattern
			) ${fetcher.toString()}
		}
		${fetcher.toFragmentString()}
	`;
	const result = (await graphQLClient().request(gql, args))['findEmployees'];
	replaceNullValues(result);
	return result as readonly X[];
}

/*
 * This argument wrapper type is not interface, because interfaces 
 * do not satisfy the constraint 'SerializableParam' or recoil
 */
export type FindEmployeesArgs = {
	readonly mockedErrorProbability?: number;
	readonly supervisorId?: string;
	readonly departmentId?: number;
	readonly namePattern?: string;
}
