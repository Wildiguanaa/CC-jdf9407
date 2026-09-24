import sys
import ast
from collections import namedtuple
from distutils.version import LooseVersion

from idraw2_0internal.plot_utils_import import from_dependency_import
drawcore_serial = from_dependency_import('drawcore_plotink.drawcore_serial') 

Versions = namedtuple("Versions", "idraw_control ebb_firmware dev_idraw_control")


def get_fw_version(serial_port):

    try:
        fw_version_string = drawcore_serial.queryVersion(serial_port)
        return fw_version_string
    except RuntimeError as e:
        raise RuntimeError("There was an error retrieving the EBB firmware version. (Error: {})".format(e))
 
def log_ebb_version(fw_version_string, log_fun):
    '''
    `online_versions` is False if we failed or didn't try to get the online versions
    '''
    log_fun("\nYour iDraw has firmware version {}.".format(fw_version_string))
            
def log_version_info(serial_port, check_updates, current_version_string, preview, message_fun, logger):
    if serial_port is not None: # i.e. there is a connected iDraw
        try:
            fw_version_string = get_fw_version(serial_port)
            log_ebb_version(fw_version_string, message_fun)
        except RuntimeError as e:
            msg = "\nUnable to retrieve iDraw  firmware version. (Error: {}) \n".format(e)
            message_fun(msg)
            logger.error(msg)
    elif preview:
        message_fun('\nFirmware version readout not available in preview mode.')

    message_fun('\nAdditional system information:')
    message_fun(sys.version)
