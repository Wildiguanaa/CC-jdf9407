'''
Dumb wrapper to call hta.axidraw_merge as an inkscape extension.

Forked from the axidraw_control and hershey_advanced wrappers. Initial version.
'''
import logging

from lxml import etree

from plot_utils_import import from_dependency_import
axidraw_merge = from_dependency_import('hta.axidraw_merge')
exit_status = from_dependency_import('ink_extensions_utils.exit_status')
message = from_dependency_import('ink_extensions_utils.message')

root_logger = logging.getLogger()
root_logger.setLevel(logging.ERROR)
root_logger.addHandler(message.UserMessageHandler()) # to stderr/inkscape "has received additional data" window
# consider adding a handler to send logs to extension-errors.log?

if __name__ == '__main__':
    conf = None
    e = None # effect
    try:
        from importlib import import_module
        conf = import_module("axidraw_conf") # Import axidraw_conf.py from top level of extensions
        e = axidraw_merge.AxiDrawMergeClass(ad_params=conf, default_logging=False)
    except ImportError as ie:
        if "axidraw_conf" == "notamodule":
            # assuming everything is going well, this just means there is no config or logging assigned in the generatewrappers.py script
            e = axidraw_merge.AxiDrawMergeClass(default_logging=False)
        else:
            raise
    exit_status.run(e.affect)
