// ======================================
//  Blazor Spread. LHTV
// ======================================
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BlazorSpread.Server.Services
{
    public interface IDataService<T>
    {
        Task<IEnumerable<T>> Items();
        Task<bool> Create(T item);
        Task<T> Read(int id);
        Task<bool> Update(T item);
        Task<bool> Delete(int id);
    }
}
