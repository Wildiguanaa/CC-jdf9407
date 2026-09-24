'''
Dumb wrapper to call hta.hershey_advanced as an inkscape extension.
Created with the help of axidrawforinkscape's generate_extensions.py script.
This goes directly in inkscape's extensions folder along with hershey_advanced.inx and the contents of axidraw_for_inkscape*_release.
Probably would be good to make an automated pipeline to do all that.
'''

from lxml import etree

from plot_utils_import import from_dependency_import
hershey_advanced = from_dependency_import('hta.hershey_advanced')
exit_status = from_dependency_import('ink_extensions_utils.exit_status')

if __name__ == '__main__':
    e = hershey_advanced.HersheyAdv()
    exit_status.run(e.affect)
