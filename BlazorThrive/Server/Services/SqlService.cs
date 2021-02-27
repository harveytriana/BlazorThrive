// ======================================
//  Blazor Spread. LHTV
// ======================================
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace BlazorSpread.Server.Services
{
    public class SqlService<T> : IDataService<T> where T : class, new()
    {
        readonly SqlContext _context;

        public SqlService(SqlContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(T item)
        {
            try {
                await _context.AddAsync(item);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception exception) {
                ErrorMessage( exception.Message);
            }
            return false;
        }

        public async Task<bool> Delete(int id)
        {
            try {
                var i = await Read(id);
                if (i != null) {
                    _context.Remove<T>(i);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            catch (Exception exception) {
                ErrorMessage( exception.Message);
            }
            return false;
        }

        public async Task<IEnumerable<T>> Items()
        {
            try {
                return await _context.Set<T>().ToListAsync();
            }
            catch (Exception exception) {
                ErrorMessage( exception.Message);
            }
            return new List<T>();
        }

        public async Task<T> Read(int id)
        {
            try {
                return await _context.FindAsync<T>(id);
            }
            catch (Exception exception) {
                ErrorMessage( exception.Message);
            }
            return null;
        }

        public async Task<bool> Update(T item)
        {
            try {
                _context.Update(item);
                await _context.SaveChangesAsync();

                // another technique
                //_context.Entry<T>(item).State = EntityState.Modified;
                //await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception exception) {
                ErrorMessage( exception.Message);
            }
            return false;
        }

        static void ErrorMessage(string error)
        {
            //TODO log error
            Trace.WriteLine("Exception:\n" + error);
        }
    }
}
